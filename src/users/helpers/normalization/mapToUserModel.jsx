const mapUserToModel = (user) => {
    return {
      first: user.first,
      middle: user.middle,
      last: user.last,
      phone: user.phone,
      email: user.email,
      password: user.password,
      url: user.url,
      alt: user.alt,
      state: user.state,
      country: user.country,
      city: user.city,
      street: user.street,
      houseNumber: user.houseNumber,
      zip: user.zip,
      isBusiness: user.isBusiness,
    };
  };
  
  export default mapUserToModel;
  