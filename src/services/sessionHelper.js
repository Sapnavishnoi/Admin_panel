class SessionHelper {
  email = null;
  name = null;
  role = null;
  allowedBrands = []
  allowedOperators = []
  allowedPlatforms = []
  allowedRegions = []

  allowedLinks = []
  allowedLinksURLArr = []
  platformActiveAll = []
  operatorActiveAll = []
  brandActiveAll = []

  token = null;

  onSignIn({email, name, role, sid, allowedBrands, allowedOperators, allowedPlatforms, allowedRegions}) {
    this.email = email;
    this.name = name;
    this.role = role;
    this.allowedBrands = allowedBrands
    this.allowedOperators = allowedOperators
    this.allowedPlatforms = allowedPlatforms
    this.allowedRegions = allowedRegions

    this.token = sid;

    localStorage.setItem("userInfo", JSON.stringify({
      token: sid,
      name,
      email,
      role,
      allowedBrands,
      allowedOperators,
      allowedPlatforms,
      allowedRegions
    }))
  }

  onCreateSession({platformActiveAll, operatorActiveAll, brandActiveAll, allowedLinks}) {
    this.platformActiveAll = platformActiveAll;
    this.operatorActiveAll = operatorActiveAll;
    this.brandActiveAll = brandActiveAll;
    this.allowedLinks = allowedLinks;
    this.allowedLinksURLArr = allowedLinks.map((data) => data.endpoint)
  }

  onSignOut() {
    this.email = null;
    this.name = null;
    this.role = null;
    this.allowedBrands = []
    this.allowedOperators = []
    this.allowedPlatforms = []
    this.allowedRegions =[]

    this.platformActiveAll = [];
    this.operatorActiveAll = [];
    this.brandActiveAll = [];
    this.allowedLinks = [];
    this.allowedLinksURLArr = [];

    this.token = null;
  }

  setUserInfo() {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    this.token = userInfo.token;

    this.email = userInfo.email;
    this.name = userInfo.name;
    this.role = userInfo.role;
    this.allowedBrands = userInfo.allowedBrands
    this.allowedOperators = userInfo.allowedOperators
    this.allowedPlatforms = userInfo.allowedPlatforms
    this.allowedRegions = userInfo.allowedRegions
  }

  isLoggedIn() {
    return localStorage.getItem("userInfo")
  }
}

export default new SessionHelper();
