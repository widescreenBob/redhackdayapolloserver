// NOTE: Set up `token-config.js` via the installation instructions in README.md
import TOKEN from './token-config.js';

const query = `{
  repository(name: "red-hat-design-system", owner: "RedHat-UX") {
    owner {
      login
    }
    name
    description
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
const repoName = data.repository.name;
const repoDescription = data.repository.description;

document.querySelector('#app').innerHTML = `
  <div class="github-content">
    <p>
      The following content is read from Github's GraphQL API:
    </p>
    <ul>
      <li>${orgName} makes the ${repoName}</li>
      <li>${orgName} has a short description for this repo: "${repoDescription}"</li>
    </ul>
  </div>
`;
