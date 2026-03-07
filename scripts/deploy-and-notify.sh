#!/bin/bash
set -e
cd ~/projects/vanar-xbpp

TOKEN=$(node -e "const fs=require('fs');const c=JSON.parse(fs.readFileSync(process.env.HOME+'/.railway/config.json'));console.log(c.user.token);" 2>/dev/null)
SERVICE_ID="137a1bff-9a23-4b22-8fc2-896ce277ce2a"

echo "🚀 Deploying to Railway..."
railway up --detach 2>&1

for i in {1..30}; do
  sleep 15
  STATUS=$(node -e "
const https=require('https');
const q=JSON.stringify({query:'{deployments(input:{serviceId:\"$SERVICE_ID\"}){edges{node{status}}}}'});
const req=https.request({hostname:'backboard.railway.com',path:'/graphql/v2',method:'POST',headers:{'Content-Type':'application/json','Authorization':'Bearer $TOKEN','Content-Length':Buffer.byteLength(q)}},res=>{let b='';res.on('data',c=>b+=c);res.on('end',()=>console.log(JSON.parse(b).data.deployments.edges[0].node.status));});
req.write(q);req.end();
  " 2>/dev/null)
  echo "[$i] $STATUS"
  if [ "$STATUS" = "SUCCESS" ]; then
    openclaw system event --text "xBPP deploy done — live at vanar-xbpp-production.up.railway.app" --mode now
    exit 0
  elif [[ "$STATUS" == "FAILED" || "$STATUS" == "CRASHED" ]]; then
    openclaw system event --text "xBPP deploy FAILED — check Railway logs immediately" --mode now
    exit 1
  fi
done
openclaw system event --text "xBPP deploy timed out after 7.5 min — check Railway" --mode now
