import Head from 'next/head';
import { gql, useQuery } from '@apollo/client';
import client from '../lib/github-api';
import { useEffect, useState } from 'react';

const REPOSITORY_QUERY = gql`
  query GetRepository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      name
      description
      stargazerCount
      stargazers{
        totalCount
      }
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
      createdAt
      updatedAt
      forkCount
      homepageUrl
      primaryLanguage {
        name
      }
      languages(first: 10) {
        nodes {
          name
          color
        }
      }
      licenseInfo {
        name
      }
      owner {
        avatarUrl
        login
      }
    }
  }
`;

interface RepositoryDetailsProps {
  owner: string;
  name: string;
}

export default function RepositoryDetails({ owner, name }: RepositoryDetailsProps) {

    const [chartData, setChartData] = useState([]);

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
  
  useEffect(() => {
    if (data) {
      const { languages } = data.repository;
      setChartData(languages.nodes);
    }
  }, [data]);
  const repoURL = `https://github.com/${repository.owner.login}/${repository.name}`

  return (
    <>
      <Head>
        <title>{repository.name} - GitHub Repository Details</title>
      </Head>
      <div className="bg-gray-100">
        <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row -mx-4">
            <div className="lg:w-1/2 px-4 mb-12 lg:mb-0 ">
                <div className="flex items-center mb-6">
                    <div className="h-12 w-12 mr-3">
                        <img src={repository.owner.avatarUrl} alt={repository.owner.login} />
                    </div>
                    <div>
                        <p className="text-gray-700 font-semibold">{repository.owner.login}</p>
                        <p className="text-sm text-gray-600">Created At: {repository.createdAt}</p>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">{repository.name}</h2>
                <p className="text-gray-700 text-lg mt-4">{repository.description}</p>
                <div className="mt-4 flex-shrink-0 flex">
                    <a href={repoURL} target="_blank" rel="noopener noreferrer">
                    <button type="button" className="relative inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-900 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900">
                        View on GitHub
                    </button>
                    </a>
                </div>
                <div className="mt-4">
                    <p className="text-lg font-bold mb-2">Languages Used :</p>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                        {chartData.map((language: any) => (
                            <div className=""
                            key={language.name}>
                                <p className="mb-1 bg-gray-200 p-3 border-2 border-black rounded text-black text-sm">{language.name}</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                        <p className='pr-2'>StarCount: </p>
                        <svg
                        className="h-4 w-4 fill-current mr-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2a10 10 0 110-20 10 10 0 010 20zm1-9a1 1 0 00-1-1H6a1 1 0 100 2h4a1 1 0 001-1z"
                            clipRule="evenodd"
                        />
                        </svg>
                        <span>{repository.stargazerCount}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                        <p className='pr-2'>ForkCount: </p>
                        <svg
                        className="h-4 w-4 fill-current mr-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm0 2a10 10 0 110-20 10 10 0 010 20zm-3.707-9.707a1 1 0 00-1.414 1.414L7.586 12H4a1 1 0 100 2h3.586l-1.707 1.707a1 1 0 001.414 1.414l3-3a1 1 0 000-1.414l-3-3z"
                            clipRule="evenodd"
                        />
                        </svg>
                        <span>{repository.forkCount}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                        <p className='pr-2'>License: </p>
                        <span>{repository.licenseInfo.name}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                        <p className='pr-2'>Last Updated On: </p>
                        <span>{repository.updatedAt}</span>
                    </div>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                        <p className='pr-2'>Total Watchers: </p>
                        <span>{repository.stargazers.totalCount}</span>
                    </div>
                </div>
            </div>
            <div className="lg:w-1/2 px-4">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Recent Issues</h3>
                <ul>
                  {repository.issues.nodes.map((issue: any) => (
                    <li key={issue.url} className="border-b py-2">
                        <a href={issue.url} className="text-gray-700 font-bold">{issue.title}</a>
                        <p className="text-sm text-gray-500 mt-1">Created at {issue.createdAt}</p>
                        <p className="text-sm text-gray-500 mt-1">Labels: {issue.labels.edges.map((label: any) => label.node.name).join(", ")}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
