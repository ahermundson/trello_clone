// @flow

export type ProjectType = {
  projectName: string,
  id: number
};

declare var module: {
  hot: {
    accept(path: string, callback: () => void): void
  }
};
