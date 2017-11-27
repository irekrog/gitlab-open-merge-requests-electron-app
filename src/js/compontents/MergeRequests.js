const axios = require('axios');

const Legend = require('./Legend');
const ListMergeRequests = require('./ListMergeRequests');
const ProgressBar = require('./ProgressBar');
const RememberToken = require('./RememberToken');
const SomethingWentWrong = require('./SomethingWentWrong');

const listMergeRequests = new ListMergeRequests();

class MergeRequests {
  constructor(token) {
    this.token = token;
    this.checkAuth();
  }

  axiosConfig(url) {
    return axios.get(url, {
      headers: {'Private-Token': this.token}
    })
  }

  checkAuth() {
    ProgressBar.show();
    this.axiosConfig('https://git.nitro-digital.com/api/v4/users')
      .then(() => {
        document.getElementById('login-form').style.display = 'none';
        this.getData();
      })
      .catch(error => {
        ProgressBar.hide();
        SomethingWentWrong.show();
        console.log(error);
      })
  }

  getData() {
    const approvalsPromises = [];
    const projectsPromises = [];
    this.axiosConfig('https://git.nitro-digital.com/api/v4/merge_requests?scope=all&state=opened&per_page=100')
      .then(({data}) => {
        const rememberToken = new RememberToken();
        rememberToken.getToken(this.token);
        const dataWithoutApprovals = data;
        dataWithoutApprovals.forEach(({project_id, iid}) => {
          const promise = this.axiosConfig(`https://git.nitro-digital.com/api/v4/projects/${project_id}/merge_requests/${iid}/approvals`);
          approvalsPromises.push(promise);
        });

        axios.all(approvalsPromises)
          .then(response => {
            // Return new array with info about approvals
            return response.map(({data}, index) => {
              dataWithoutApprovals[index]['approvalsInfo'] = data;
              return dataWithoutApprovals[index];
            });
          })
          .then(dataWithApprovals => {
            dataWithApprovals.forEach(({project_id}) => {
              const promise = this.axiosConfig(`https://git.nitro-digital.com/api/v4/projects/${project_id}`);
              projectsPromises.push(promise);
            });

            axios.all(projectsPromises)
              .then(response => {
                // Return new array with info about projects
                return response.map(({data}, index) => {
                  dataWithApprovals[index]['projectInfo'] = data;
                  return dataWithApprovals[index];
                });
              })
              .then(dataWithProjectsAndApprovals => {
                listMergeRequests.createListItems(dataWithProjectsAndApprovals);
                ProgressBar.hide();
                Legend.show();
              })
          })
      })
      .catch(error => {
        console.log(error);
        ProgressBar.hide();
        SomethingWentWrong.show();
        document.getElementById('login-form').style.display = 'block';
      });
  }
}

module.exports = MergeRequests;
