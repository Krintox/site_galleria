import Head from 'next/head';
import { gql, useQuery } from '@apollo/client';
import client from '../lib/github-api';

const REPOSITORY_QUERY = gql`
  query GetRepository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      description
      stargazerCount
      issues(last: 10) {
        nodes {
          title
          url
          labels(first: 5){
            edges{
              node {
                name
              }
            }
          }
          createdAt
        }
      }      
    }
  }
`;

interface RepositoryDetailsProps {
  owner: string;
  name: string;
}

export default function RepositoryDetails({ owner, name }: RepositoryDetailsProps) {
  const { loading, error, data } = useQuery(REPOSITORY_QUERY, {
    variables: { owner, name },
    client,
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const { repository } = data;

  return (
    <>
      <Head>
        <title>{repository.name} - GitHub Repository Details</title>
      </Head>
      <h1>{repository.name}</h1>
      <p>{repository.description}</p>
      <p>Stars: {repository.stargazerCount}</p>
      {/* <p>Forks: {repository.forksCount}</p> */}
      <ul>
        {repository.issues.nodes.map((issue: any) => (
          <li key={issue.url}>
          <br />
            <a href={issue.url}>{issue.title}</a>
            <br />
            Created at {issue.createdAt}
          <br />
          Labels: {issue.labels.edges.map((label: any) => label.node.name).join(", ")}
          </li>
        ))}
      </ul>
        {/* <Image src={repository.owner.avatarUrl} alt={repository.owner.login} width={48} height={48} className="rounded-full" /> */}
        {/* <div>
          <p className="text-lg font-medium">{repository.owner.login}</p>
          <p className="text-gray-600">{repository.owner.followers.totalCount} followers</p>
          <p className="text-gray-600">{repository.owner.repositories.totalCount} public repositories</p>
        </div> */}
    </>
  );
}
