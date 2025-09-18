import { useListener } from "./useListener";

type Props = {
  documentId?: string;
};

export const ListenerInitializer = ({ documentId }: Props) => {
  useListener(documentId);

  return null;
};
