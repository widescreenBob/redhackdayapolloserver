// NOTE: Set up `token-config.js` via the installation instructions in README.md
import TOKEN from './token-config.js';

const query = `{
  repository(name: "red-hat-design-system", owner: "RedHat-UX") {
    owner {
      login
    }
    name
    description
    url
  }
}`;

const fetcher = async (query) => {
  try {
    const res = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: `bearer ${TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query })
    });
    const { data } = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const data = await fetcher(query);
console.log(data);
const orgName = data.repository.owner.login;
// const repoName = data.repository.name;
const url = data.repository.url;
const repoDescription = data.repository.description;

document.querySelector('#app').innerHTML = `
  <div class="github-content" style="max-width: 800px;"">
    <rh-card>
      <h2 slot="header">${orgName}</h2>
      <p class="dx-m-0">${repoDescription}. This content is pulled via a GraphQL API and this is an RHDS Card component.</p>
      <rh-cta slot="footer">
        <a href="${url}">View Repository on Github</a>
      </rh-cta>
    </rh-card>
  </div>
`;
