const MUTATIONS_USER_DETAILS = (state, user) => {

    state.authUser.Id=user.Id;
    state.authUser.Token = user.Token;
    state.authUser.Email = user.Email;
    state.authUser.FirstName = user.FirstName;
    state.authUser.LastName = user.LastName;
    state.authUser.Mobile = user.Mobile;


};

export { MUTATIONS_USER_DETAILS };
