function UserList(users_arr) {
    let available_id, users;

    initUserList();

    return {
        showNames: showNames,
        showById: showById,
        add: add,
        removeById: removeById,
        logUsersCould: logUsersCould
    };

    /////////////////////////////////////////////////

    function initUserList(){
        available_id=0;
        users = addValidatedUsers(users_arr)
    }

    function showNames() {
        users.forEach((el) => console.log(`${el.firstName} ${el.lastName || ''}`));
        return this;
    }

    function showById(id) {
        let user_index = findUserIndexById(id);
        user_index && console.log(userInfo(users[user_index]));
        return this;
    }

    function add(user) {
        if (!validUser(user)) {
            console.log(`Unable to create  new User -> firstName is required`);
            return this;
        }

        let newUser = {
            id: available_id++,
            firstName: user.firstName,
            lastName: user.lastName,
            age: user.age
        };

        users.push(newUser);
        console.log(`Hi everyone, i am ${userInfo(newUser)}`);
        return this;
    }

    function removeById(id) {
        let user_index = findUserIndexById(id);
        user_index && console.log(`bye bye ${(users.splice(user_index, 1))[0].firstName } `);
        return this;
    }

    function logUsersCould() {
        console.log(users.length);
        return this;
    }

    function findUserIndexById(id) {
        let search = users.findIndex((el) => el.id === id);
        return (search !== -1) ? search : console.log(`Unable to find user with id: ${id}`);
    }


    function addValidatedUsers(user_arr) {
        return user_arr.filter((el)=> {
            let valid = validUser(el);
            valid && (el.id = available_id++);
            return valid;
        });
    }

    function validUser(user) {
        let userRequiredName = user.firstName;
        return ( userRequiredName !== undefined ) && ( userRequiredName !== '' );
    }

    function userInfo(user) {
        return `${user.firstName} ${user.lastName || ''}, age: ${user.age || '_'}, id: ${user.id}`;
    }
}


var users = [
    {
        "firstName": "Jony",
        "lastName": "Snow",
        "age": 30
    },
    {
        "lastName": "Rger",
        "age": 30
    },
    {
        "firstName": "Ala",
        "lastName": "Kula",
        "age": 30
    },
    {
        "firstName": "daN",
        "age": 30
    }
];


var userlist = new UserList(users);

userlist
    .showNames()
    .add({
        firstName: "Correct Name",
        lastName: "Xm"
    })
    .logUsersCould()
    .add({
        firstName: "",
        lastName: "Incorect Name",
        age: 3
    })
    .logUsersCould()
    .removeById(5)
    .logUsersCould()
    .removeById(3)
    .showById(0)
    .showNames();


