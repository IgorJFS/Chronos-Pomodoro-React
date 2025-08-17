import { useTaskContext } from '../../contexts/TaskContext/useTaskContext';
import { getNextCycle } from '../../utils/getNextCycle';
import { getNextCycleType } from '../../utils/getNextCycleType';

export function Tips() {
  const { state } = useTaskContext();
  const nextCycle = getNextCycle(state.currentCycle);
  const nextCycleType = getNextCycleType(nextCycle);
  const tipsWhenActive = {
    workTime: <span>Focus for {state.config.workTime} minutes</span>,
    shortBreakTime: (
      <span>Take a break for {state.config.shortBreakTime} minutes</span>
    ),
    longBreakTime: (
      <span>Take a break for {state.config.longBreakTime} minutes</span>
    ),
  };

  const tipsWhenNotActive = {
    workTime: <span>Next work session is {state.config.workTime} minutes</span>,
    shortBreakTime: (
      <span>Next short break is {state.config.shortBreakTime} minutes</span>
    ),
    longBreakTime: (
      <span>Next long break is {state.config.longBreakTime} minutes</span>
    ),
  };
  return (
    <>
      {!!state.activeTask && tipsWhenActive[state.activeTask.type]}
      {!state.activeTask && tipsWhenNotActive[nextCycleType]}
    </>
  );
}
