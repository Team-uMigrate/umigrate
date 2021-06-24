import React, { Component } from 'react';
import EditProfileView from '../../components/views/EditProfileView';
import { getUserData } from '../../utils/storageAccess';
// import { JobsEndpoint } from '../../utils/endpoints';
// import { ActivityIndicator } from 'react-native';
// Some parts may be used for education/jobs section of edit profile page
class EditProfileScreen extends Component {
  state = {
    user: {},
    /* pages: false,
    nextPage: 1,
    jobs: [],
    done: false, */
  };

  constructor(props) {
    super(props);
  }

  componentDidMount = async () => {
    const userData = await getUserData();
    this.setState({ user: userData });
    /* await this.getJobs();
    // repeat if there's more pages
    while (this.state.pages) await this.getJobs();
    this.setState({
      jobs: this.sortJobs(),
    });
    this.sortJobs();
    this.setState({ done: true }); */
  };

  sortJobs = () => {
    const nulls = this.state.jobs.filter((job) => job.end_date === null);
    const sortedNulls = nulls.sort(
      (a, b) => new Date(a.start_date) - new Date(b.start_date)
    );
    const notNulls = this.state.jobs.filter((job) => job.end_date !== null);
    const sortedNotNulls = notNulls.sort(
      (a, b) => new Date(a.end_date) - new Date(b.end_date)
    );
    return [...sortedNulls, ...sortedNotNulls];
  };

  getJobs = async () => {
    /* TODO: for some reason, the filtering by creator doesn't filter by creator (it can filter by job_type though ? )
       currently, it returns all the jobs for all the users */
    const response = await JobsEndpoint.list(this.state.nextPage, {
      creator: this.state.user.id,
    });
    let next = !!response.data.next;
    this.setState({
      pages: next,
      nextPage: next ? this.state.nextPage + 1 : this.state.nextPage,
    });
    // temporarily find the user's jobs manually
    response.data.results.map((job) => {
      if (job.creator === this.state.user.id) this.state.jobs.push(job);
    });
  };

  render() {
    const navigation = this.props.navigation;
    const { user } = this.state;
    return <EditProfileView user={user} navigation={navigation} />;
    /* const navigation = this.props.navigation;
    if (this.state.done) {
      const { user } = this.state;
      return (
        <EditProfileView user={user} navigation={navigation} jobs={jobs} />
      );
    } else return <ActivityIndicator />; */
  }
}
export default EditProfileScreen;
