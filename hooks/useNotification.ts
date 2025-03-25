import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { ResponseStatus } from "@/enums";
import { RootState } from "@/redux/store";
import { hideAlert, showAlert } from "@/redux/features/notificationSlice";

export const useNotification = () => {
  const dispatch = useDispatch();
  const alertState = useSelector((state: RootState) => state.notification);

  const showAlertHandler = useCallback(
    (alertData: {
      message?: string;
      error?: string;
      type: ResponseStatus;
      component?: string;
    }) => {
      dispatch(showAlert(alertData));
    },
    [dispatch]
  );

  const hideAlertHandler = useCallback(() => {
    dispatch(hideAlert());
  }, [dispatch]);

  return {
    ...alertState,
    showAlert: showAlertHandler,
    hideAlert: hideAlertHandler,
  };
};
