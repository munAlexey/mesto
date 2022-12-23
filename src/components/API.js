export class API {
  constructor(config) {
    this.baseUrl = config.baseUrl;
    this.headers = config.headers;
  }

  async getCardsList() {
    const response = await fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      'headers': this.headers
    })
    const data = await response.json();
    return data;
  }

  async getProfileInfo() {
    const response = await fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      'headers': this.headers
      }) 
      const data = await response.json();
      return data
  }

  editProfileInfo(profileUserInfo) {
    fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      'headers': {
        'Authorization' : '9be9cc24-8f1f-4506-ba7e-99001911a764',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: profileUserInfo.name,
        about: profileUserInfo.info
      })
    })
  }

  async createCard(inputs) {
    const response = await fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      'headers': {
        'Authorization' : '9be9cc24-8f1f-4506-ba7e-99001911a764',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputs.title,
        link: inputs.link
      })
    })
    return response;
  }
}