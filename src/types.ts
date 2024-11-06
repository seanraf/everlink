export type UrlButton = {
  id: string;
  title: string;
  url: string;
};

export type UrlButtonErrors = {
  id: string;
  title: string;
  url: string;
};

export type ThemeCards = { id: string; themeName: string; theme: JSX.Element };

export type URLButtonsProps = {
  urlButtons: UrlButton[];
  setUrlButtons: React.Dispatch<React.SetStateAction<UrlButton[]>>;
  urlButtonErrors: UrlButtonErrors[];
  setUrlButtonErrors: React.Dispatch<React.SetStateAction<UrlButtonErrors[]>>;
};

export type DraggableItemProps = {
  button: UrlButton;
  index: number;
  moveButton: (fromIndex: number, toIndex: number) => void;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    field: string
  ) => void;
  handleDelete: (index: number) => void;
  error: { title: string; url: string };
  urlButtonsLength: number;
};

export type SelectThemeProps = {
  selectedTheme: string;
  setSelectedTheme: React.Dispatch<React.SetStateAction<string>>;
};

export type MinterProps = {
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
  selectedTheme: string;
  userName: string;
  bio: string;
  urlButtons: UrlButton[];
  setDomain: React.Dispatch<React.SetStateAction<string | null>>;
  setDeploymentLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export type DomainContent = {
  domainList: string[];
  taskId: string;
};

export type DeploymentRecord = {
  _id: string;
  domainList: string[];
  taskId: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    _id: string;
    farcasterId: string;
    username: string;
    createdAt: string;
    updatedAt: string;
  };
};
