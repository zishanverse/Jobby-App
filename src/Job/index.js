import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Cookie from 'js-cookie'
import Header from '../Header'
import JobItem from '../JobItem'
import ProfileAndFilter from '../ProfileAndFilter'

import './index.css'

class Job extends Component {
  state = {
    search: '',
    employeeId: [],
    salaryId: '',
    jobList: [],
    profile: [],
    jobListStatus: 'INITIAL',
    profileStatus: 'INITIAL',
  }

  componentDidMount() {
    this.getJobData()
    this.getProfileData()
  }

  getProfileData = async () => {
    this.setState({profileStatus: 'IN-PROGRESS'})
    const jwt = Cookie.get('jwt_token')
    const option = {method: 'GET', headers: {Authorization: `Bearer ${jwt}`}}
    const profileResponse = await fetch('https://apis.ccbp.in/profile', option)
    const profileData = await profileResponse.json()
    if (profileResponse.ok) {
      this.setState({
        profile: this.profilecase(profileData.profile_details),
        profileStatus: 'SUCCESS',
      })
    } else {
      this.setState({profileStatus: 'FAILURE'})
    }
  }

  getJobData = async () => {
    this.setState({jobListStatus: 'IN-PROGRESS'})
    const jwt = Cookie.get('jwt_token')

    const {employeeId, salaryId, search} = this.state
    const employeeList = employeeId.join(',')

    const option = {method: 'GET', headers: {Authorization: `Bearer ${jwt}`}}
    const url = `https://apis.ccbp.in/jobs?employment_type=${employeeList}&minimum_package=${salaryId}${
      search !== '' ? `&search=${search}` : ''
    }`
    const jobResponse = await fetch(url, option)

    const jobData = await jobResponse.json()
    if (jobResponse.ok) {
      console.log(
        jobData.jobs.map(each => this.jobCase(each)),
        jobData.jobs.length,
      )
      if (jobData.jobs.length === 0) {
        this.setState({jobListStatus: 'NO-JOB'})
      } else {
        this.setState({
          jobList: jobData.jobs.map(each => this.jobCase(each)),
          jobListStatus: 'SUCCESS',
        })
      }
    } else {
      this.setState({jobListStatus: 'FAILURE'})
    }
  }

  profilecase = item => ({
    name: item.name,
    profileImageUrl: item.profile_image_url,
    shortBio: item.short_bio,
  })

  jobCase = each => ({
    companyLogoUrl: each.company_logo_url,
    employmentType: each.employment_type,
    jobDescription: each.job_description,
    id: each.id,
    location: each.location,
    packagePerAnnum: each.package_per_annum,
    rating: each.rating,
    title: each.title,
  })

  loaderRender = text => (
    <div
      className={`loader-container profile-loader ${text}`}
      data-testid="loader"
    >
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  profileFailure = () => (
    <div className="profile-failure">
      <button type="button" className="retry">
        Retry
      </button>
    </div>
  )

  checkedType = event => {
    const {employeeId} = this.state
    console.log(event.target.checked)
    if (event.target.checked) {
      this.setState(
        pre => ({
          employeeId: [...pre.employeeId, event.target.value],
        }),
        this.getJobData,
      )
    } else {
      const newEmployeeList = employeeId.filter(
        each => each !== event.target.value,
      )

      this.setState({employeeId: newEmployeeList}, this.getJobData)
    }
  }

  jobList = () => {
    const {jobList} = this.state

    return (
      <ul className="list overflow">
        {jobList.map(each => (
          <JobItem key={each.id} item={each} />
        ))}
      </ul>
    )
  }

  failureJob = () => (
    <div className="job-item-details-loader-failure">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="job-item-failure-img"
      />
      <h1 className="job-item-failure-head">Oops! Something Went Wrong</h1>
      <p className="job-item-failure-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button type="button" className="job-item-failure-btn">
        Retry
      </button>
    </div>
  )

  noJob = () => (
    <div className="no-job-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-job-img"
      />
      <h1 className="no-job-heading">No Jobs Found</h1>
      <p className="no-job-para">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  selectedType = event =>
    this.setState({salaryId: event.target.value}, this.getJobData)

  changeSearch = event =>
    this.setState({search: event.target.value.toLowerCase()})

  renderJoblist = () => {
    const {jobListStatus} = this.state

    switch (jobListStatus) {
      case 'IN-PROGRESS':
        return this.loaderRender('job-loader')
      case 'SUCCESS':
        return this.jobList()
      case 'NO-JOB':
        return this.noJob()
      case 'FAILURE':
        return this.failureJob()
      default:
        return null
    }
  }

  render() {
    const {profileStatus, profile, employeeId} = this.state
    return (
      <>
        <Header />

        <div className="job-container">
          <ProfileAndFilter
            profileStatus={profileStatus}
            funcLoader={this.loaderRender}
            profile={profile}
            funcFailure={this.profileFailure}
            employeeId={employeeId}
            funcCheckedType={this.checkedType}
            funcSelectedType={this.selectedType}
          />
          <div className="job-list-container">
            <div className="job-list-input-container">
              <input
                type="search"
                onChange={this.changeSearch}
                className="search"
                placeholder="Search"
              />
              <button
                type="button"
                data-testid="searchButton"
                onClick={() => this.getJobData()}
                className="search-icon-btn"
              >
                <BsSearch className="search-icon" />
                {` `}
              </button>
            </div>

            <div className="job-list-card">{this.renderJoblist()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default Job
