// TASK 1
/* You have 3 timestamps for list of users along with the device details : logged_in, logged_out,
and lastSeenAt (for the device during the log in period). Please note:
Users can log in from multiple devices, users are generally logged in
for a longer duration of time 6 months or so. */

// Assumptions: 
// 1) If a user logs out of 1 device, we consider it logged out of every device. By this logic,
//    loggedOutTime will be the same for all the instances if user logs out while being logged in with multiple devices
// 2) Multiple instances of same user is allowed in USERS list(case of multiple device logins).
// 3) We need monthly activity year-wise("year" can be passed into the function).


// define interface
interface User {
    userId: number;
    loggedInTime: string;
    loggedOutTime: string;
    lastSeenTime: string;
    device: string;
  }

const users: User[] = [
    {
        userId: 1,
        loggedInTime: '2024-01-18T07:51:28.801Z',
        loggedOutTime: '2024-05-18T07:51:28.801Z',
        lastSeenTime: '2024-04-18T07:51:28.801Z',
        device: 'desktop1'
    },
    {
        userId: 1,
        loggedInTime: '2024-02-18T07:51:28.801Z',
        loggedOutTime: '2024-05-18T07:51:28.801Z',
        lastSeenTime: '2024-04-18T07:51:28.801Z',
        device: 'desktop2'
    },
    {
        userId: 2,
        loggedInTime: '2024-03-18T07:51:28.801Z',
        loggedOutTime: '2024-07-18T07:51:28.801Z',
        lastSeenTime: '2024-07-18T07:51:28.801Z',
        device: 'desktop3'
    },
    {
        userId: 3,
        loggedInTime: '2024-01-18T07:51:28.801Z',
        loggedOutTime: '2024-06-18T07:51:28.801Z',
        lastSeenTime: '2024-06-18T07:51:28.801Z',
        device: 'desktop4'
    },
    {
        userId: 3,
        loggedInTime: '2024-05-19T07:51:28.801Z',
        loggedOutTime: '2024-06-18T07:51:28.801Z',
        lastSeenTime: '2024-06-18T07:51:28.801Z',
        device: 'desktop1'
    },
]

/**
 * Calculates the number of users logged in each month for a given year.
 * 
 * @param {User[]} users - An array of User objects representing the users.
 * @param {string} year - The year for which monthly user counts are to be calculated (format: 'YYYY').
 * @returns An object of logged in count for each month.
 */
function calculateMonthlyLoggedInUsers(users: User[], year: String){

    interface Activity {
        userId: number;
      }
      
      let monthlyActivity: Map<number, Activity[]> = new Map();

      // set all the months in the map
      for (let i = 1; i <= 12; i++) {
        monthlyActivity.set(i, []);
      }

      const currentDate: Date = new Date();
      const currentYear: string = `${currentDate.getFullYear()}`

    // Iterate over all users
    for(let  user of users){

        // get logged in month
        const loggedInDate: Date = new Date(user?.loggedInTime);
        const loggedInMonth: number = loggedInDate.getMonth() + 1;
        const loggedInYear: string = `${loggedInDate.getFullYear()}`;

        // get logged out month
        const loggedOutDate: Date = new Date(user?.loggedOutTime) || new Date();
        const loggedOutMonth: number = loggedOutDate.getMonth() + 1;

        // filter the year for which we need the monthly logged-in users
        if(loggedInYear === year){
            // push the user in array corresponding to every month for which the user is logged in
            for(let i: number = loggedInMonth; i <= loggedOutMonth; i++){
                // get the month's value from the map;
                const monthValueArrayInMap = monthlyActivity.get(i);
                const exists = monthValueArrayInMap?.some(existingUser => existingUser.userId === user.userId);

                if(!exists){
                    monthlyActivity.get(i)!.push({userId: user.userId});
                }
            }
        }
    }

    // the monthlyActivity map now contains the info of every user which logged in every month.
    console.log(monthlyActivity);

    return {
        monthlyLogins: {
            'january': monthlyActivity.get(1)?.length,
            'feburary': monthlyActivity.get(2)?.length,
            'march': monthlyActivity.get(3)?.length,
            'april': monthlyActivity.get(4)?.length,
            'may': monthlyActivity.get(5)?.length,
            'june': monthlyActivity.get(6)?.length,
            'july': monthlyActivity.get(7)?.length,
            'august': monthlyActivity.get(8)?.length,
            'september': monthlyActivity.get(9)?.length,
            'octuber': monthlyActivity.get(10)?.length,
            'november': monthlyActivity.get(11)?.length,
            'december': monthlyActivity.get(12)?.length,
        }
    }
}

/**
 * Calculates the number of users active each month for a given year.
 * 
 * @param {User[]} users - An array of User objects representing the users.
 * @param {string} year - The year for which monthly user counts are to be calculated (format: 'YYYY').
 * @returns An object of active user count for each month.
 */
function calculateMonthlyActiveUsers(users: User[], year: String){

    interface Activity {
        userId: number;
      }
      
      let monthlyActivity: Map<number, Activity[]> = new Map();

      // set all the months in the map
      for (let i = 1; i <= 12; i++) {
        monthlyActivity.set(i, []);
      }

      const currentDate: Date = new Date();
      const currentYear: string = `${currentDate.getFullYear()}`

    // Iterate over all users
    for(let  user of users){

        // get last seen month
        const lastSeenDate: Date = new Date(user?.lastSeenTime);
        const lastSeenMonth: number = lastSeenDate.getMonth() + 1;
        const lastSeenYear: string = `${lastSeenDate.getFullYear()}`;

         // get logged in month
         const loggedInDate: Date = new Date(user?.loggedInTime);
         const loggedInMonth: number = loggedInDate.getMonth() + 1;
         const loggedInYear: string = `${loggedInDate.getFullYear()}`;

        // filter the year for which we need the monthly logged-in users
        if(loggedInYear === year){
            // push the user in array corresponding to every month for which the user is logged in
            for(let i: number = loggedInMonth; i <= lastSeenMonth; i++){
                // get the month's value from the map;
                const monthValueArrayInMap = monthlyActivity.get(i);
                const exists = monthValueArrayInMap?.some(existingUser => existingUser.userId === user.userId);

                if(!exists){
                    monthlyActivity.get(i)!.push({userId: user.userId});
                }
            }
        }
    }

    // the monthlyActivity map now contains the info of every user which logged in every month.
    console.log(monthlyActivity);

    return {
        monthlyLogins: {
            'january': monthlyActivity.get(1)?.length,
            'feburary': monthlyActivity.get(2)?.length,
            'march': monthlyActivity.get(3)?.length,
            'april': monthlyActivity.get(4)?.length,
            'may': monthlyActivity.get(5)?.length,
            'june': monthlyActivity.get(6)?.length,
            'july': monthlyActivity.get(7)?.length,
            'august': monthlyActivity.get(8)?.length,
            'september': monthlyActivity.get(9)?.length,
            'octuber': monthlyActivity.get(10)?.length,
            'november': monthlyActivity.get(11)?.length,
            'december': monthlyActivity.get(12)?.length,
        }
    }
}

// CALCULATE MONTHLY LOGGED-IN USERS
// const monthlyLogins = calculateMonthlyLoggedInUsers(users, '2024');
// console.log('Monthly logged-in Users',monthlyLogins)

// CALCULATE MONTHLY ACTIVE USERS
const monthlyActiveUsers = calculateMonthlyActiveUsers(users, '2024');
console.log('Monthly Active Users', monthlyActiveUsers)

