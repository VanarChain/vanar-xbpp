import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useCallback, useState } from 'react';
import type { DotLottie } from '@lottiefiles/dotlottie-react';

interface WizardMascotProps {
  className?: string;
  width?: number;
  height?: number;
}

export function WizardMascot({ className, width = 400, height = 400 }: WizardMascotProps) {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);

  const dotLottieRefCallback = useCallback((instance: DotLottie | null) => {
    setDotLottie(instance);
  }, []);

  // Trigger different states
  const triggerIdle = () => {
    dotLottie?.setStateMachineBooleanInput('idle_trigger', true);
  };

  const triggerSkill = () => {
    dotLottie?.setStateMachineBooleanInput('skill_trigger', true);
  };

  const triggerAttack = () => {
    dotLottie?.setStateMachineBooleanInput('attack_trigger', true);
  };

  return (
    <div className={className}>
      <DotLottieReact
        src="/animations/wizard.lottie"
        autoplay
        loop
        dotLottieRefCallback={dotLottieRefCallback}
        style={{ width, height }}
      />
      
      {/* Debug controls - remove in production */}
      {process.env.NODE_ENV === 'development' && (
        <div className="flex gap-2 mt-4 justify-center">
          <button 
            onClick={triggerIdle}
            className="px-3 py-1 text-xs bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            Idle
          </button>
          <button 
            onClick={triggerSkill}
            className="px-3 py-1 text-xs bg-purple-700 text-white rounded hover:bg-purple-600"
          >
            Skill (Evaluate)
          </button>
          <button 
            onClick={triggerAttack}
            className="px-3 py-1 text-xs bg-red-700 text-white rounded hover:bg-red-600"
          >
            Attack (Block)
          </button>
        </div>
      )}
    </div>
  );
}

export default WizardMascot;
