import { LoadingIndicatorModal } from "../loading_indicator_modal/loading_indicator_modal";

export interface FullScreenLoadingModalProps {
  readonly isVisible: boolean;
}

export function FullScreenLoadingIndicatorModal(props: FullScreenLoadingModalProps) {
  return (
    <LoadingIndicatorModal style={{position: "fixed", top: "0px", left: "0px", width: "100vw", height: "100vh"}} isVisible={props.isVisible} />
  );
}