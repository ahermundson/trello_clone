import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Close from 'material-ui/svg-icons/navigation/close';
import { addProject } from '../redux/actionCreators';
import ProjectCard from './ProjectCard';

const MainLandingDiv = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ProjectHeader = styled.h3`
  margin-top: 10px;
  font-family: Roboto, sans-serif;
`;

const ProjectDiv = styled.div`
  height: 100px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  background-color: #0d47a1;
  color: white;
  border-radius: 5px;
  font-family: Roboto, sans-serif;
`;

const AddProjectDiv = styled.div`
  height: 100px;
  width: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  background-color: #e2e4e6;
  border-radius: 5px;
`;

const ProjectContainer = styled.div`
  display: flex;
`;

const closedIconStyle = {
  alignSelf: 'flex-start'
};

const styles = {
  underlineStyle: {
    borderColor: '#0d47a1'
  },
  underlineFocusStyle: {
    borderColor: 'grey'
  },
  hintTextStyle: {
    color: '#0d47a1'
  }
};

class Landing extends Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      newProjectName: '',
      showForm: false
    };
    this.handleAddProjectChange = this.handleAddProjectChange.bind(this);
    this.onNewProjectSubmit = this.onNewProjectSubmit.bind(this);
    this.showFormToggle = this.showFormToggle.bind(this);
  }

  onNewProjectSubmit(event) {
    event.preventDefault();
    this.props.addProject(this.state.newProjectName);
    this.setState({
      newProjectName: '',
      showForm: false
    });
  }

  handleAddProjectChange(event) {
    this.setState({
      newProjectName: event.target.value
    });
  }

  showFormToggle() {
    this.setState({
      newProjectName: '',
      showForm: !this.state.showForm
    });
  }

  render() {
    return (
      <MainLandingDiv>
        <ProjectHeader>Projects</ProjectHeader>
        <ProjectContainer>
          {this.props.projects.map(project => (
            <Link
              key={project.id}
              to={`/project/${project.id}`}
              style={{ textDecoration: 'none', color: '#0d47a1' }}
              href="/project">
              <ProjectDiv key={project.id}>
                <ProjectCard project={project} />
              </ProjectDiv>
            </Link>
          ))}
          {this.state.showForm ? (
            <AddProjectDiv>
              <form onSubmit={this.onNewProjectSubmit}>
                <TextField
                  underlineStyle={styles.underlineStyle}
                  underlineFocusStyle={styles.underlineStyle}
                  hinttextstyle={styles.hintTextStyle}
                  hintText="Add Project"
                  onChange={this.handleAddProjectChange}
                  value={this.state.newProjectName}
                />
              </form>
              <Close style={closedIconStyle} onClick={this.showFormToggle} />
            </AddProjectDiv>
          ) : (
            <AddProjectDiv>
              <FlatButton onClick={this.showFormToggle}>Add Project</FlatButton>
            </AddProjectDiv>
          )}
        </ProjectContainer>
      </MainLandingDiv>
    );
  }
}

const mapStateToProps = state => ({
  projects: state.projects
});
const mapDispatchToProps = dispatch => ({
  addProject(newProjectName) {
    dispatch(addProject(newProjectName));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Landing);
