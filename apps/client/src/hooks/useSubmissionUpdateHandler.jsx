import { useSetRecoilState } from "recoil";
import { playgroundState } from "../store/atoms/playground";

const useSubmissionUpdateHandler = () => {
  const setPlayground = useSetRecoilState(playgroundState);

  const onSubmissionUpdate = (notification) => {
    console.log(notification);
    if (notification.type === "playground") {
      setPlayground((prev) => ({
        ...prev,
        output: notification.output || prev.output,
        status: notification.status || prev.status,
        error: notification.error || prev.error,
        executionTime: notification.executionTime || prev.executionTime
      }));
    }
  };

  return onSubmissionUpdate;
};

export default useSubmissionUpdateHandler;
