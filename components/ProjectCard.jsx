// @flow

import React from 'react';
// import { Card } from 'material-ui/Card';
// import type { ProjectType } from './flow-typed/types';

declare type ProjectType = {
  projectName: string,
  id: number
};

const ProjectCard = (props: { project: ProjectType }) => (
  <div>
    <h3>{props.project.projectName}</h3>
  </div>
);

export default ProjectCard;

// <Card style={styles}>
//   <h1>{props.project.projectName}</h1>
// </Card>
