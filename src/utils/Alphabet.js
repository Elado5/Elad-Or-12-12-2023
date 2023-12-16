export const isEnglish = (str) => {
    //const regex = /^[~`!@#$%^&*()_+=[]{}|;':",./<>?a-zA-Z0-9-]+$/;
    const regex = /^[A-Za-z]+$/;
    return regex.test(str)
  };
