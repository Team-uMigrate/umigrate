This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


# Models
## Ads
id={ad.id}
title={ad.title}
description={ad.description}
region={ad.region}
datetimeCreated={ad.datetime_created}
category={ad.categories}
features={ad.features}
price={ad.price}
creator={ad.creator}
likedUsers= {ad.liked_users}
taggedUsers={ad.tagged_users}

## Events
id={event.id}
title={event.title}
description={event.description}
region={event.region}
datetimeCreated={event.datetime_created}
startDatetime={event.start_datetime}
endDatetime={event.end_datetime}
price={event.price}
streetAddress={event.street_address}
city={event.city}
division={event.division}
country={event.country}
creator={event.creator}
likedUsers= {event.liked_users}
taggedUsers={event.tagged_users}
interestedUsers= {event.interested_users}
attendingUsers={event.attending_users}

## Housing
id={housing.id}
title={housing.title}
description={housing.description}
region={housing.region}
datetimeCreated={housing.datetime_created}
category={housing.categories}
features={housing.features}
price={housing.price}
term={housing.term}
streetAddress={housing.street_address}
city={housing.city}
division={housing.division}
country={housing.country}
creator={housing.creator}
likedUsers= {housing.liked_users}
taggedUsers={housing.tagged_users}

## Jobs
id={job.id}
title={job.title}
description={job.description}
region={job.region}
datetimeCreated={job.datetime_created}
position={job.position}
company={job.company}
jobType={job.job_type}
startDate={job.start_date}
endDate={job.end_date}
creator={job.creator}

## Messaging Rooms
id={room.id}
title={room.title}
description={room.description}
region={room.region}
datetimeCreated={room.datetime_created}
isDirectMessaging={room.is_direct_messaging}
creator={room.creator}
members={room.members}


## Polls
id={poll.id}
title={poll.title}
description={poll.description}
region={poll.region}
datetimeCreated={poll.datetime_created}
creator={poll.creator}
likedUsers= {poll.liked_users}
taggedUsers={poll.tagged_users}
options={poll.options}

## Posts
id={post.id}
title={post.title}
description={post.description}
region={post.region}
datetimeCreated={post.datetime_created}
creator={post.creator}
likedUsers= {post.liked_users}
taggedUsers={post.tagged_users}

## Users
id={user.id}
firstName={user.first_name}
lastName={house.user}
preferredName={user.preferred_name}
region={user.region}
datetimeCreated={user.datetime_created}
term={user.term}
streetAddress={user.street_address}
city={user.city}
division={user.division}
country={user.country}
creator={user.creator}
followedUsers={user.liked_users}


## User Settings
notificationPrivacy={userSettings.notification_privacy}
allowLocation={userSettings.allow_location}
language={userSettings.language}
currency={userSettings.currency}
darkTheme={userSettings.dark_theme}
blockedUsers= {userSettings.blocked_users}
