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
  setActiveStep: React.Dispatch<React.SetStateAction<number>>;
};
