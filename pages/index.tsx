import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from 'react';
import Link from 'next/link';

interface RepositoryCardProps {
  owner: string;
  name: string;
  description: string;
  createdAt: string;
}

const RepositoryCard = ({ owner, name, description, createdAt }: RepositoryCardProps) => {
  return (
    <Link href={`/${owner}/${name}`}>
      <div className="rounded overflow-hidden shadow-lg cursor-pointer bg-white hover:bg-gray-100 m-3 w-full mr-2">
        <div className="px-6 py-4">
          <div className="font-bold text-xl mb-2">{name}</div>
          <p className="text-gray-700 text-base">{description}</p>
        </div>
        <div className="px-6 py-4">
          <p className="text-gray-700 text-base">{owner}</p>
          <p className="text-gray-700 text-base">{createdAt}</p>
        </div>
      </div>
    </Link>
  );
};

export default function Component() {
  const { data: session } = useSession();
  const repositories = [
    {
      owner: 'microsoft',
      name: 'vscode',
      description: 'Visual Studio Code',
      createdAt: '2015-04-29T23:49:00Z'
    },
    {
      owner: 'angular',
      name: 'angular',
      description: 'One framework. Mobile & desktop.',
      createdAt: '2010-10-20T22:58:08Z'
    },
    {
      owner: 'facebook',
      name: 'react-native',
      description: 'A framework for building native apps using React',
      createdAt: '2015-01-09T18:10:16Z'
    },
    {
      owner: 'expressjs',
      name: 'express',
      description: 'Fast, unopinionated, minimalist web framework for Node.js',
      createdAt: '2009-06-26T18:36:47Z'
    },
    {
      owner: 'nestjs',
      name: 'nestjs',
      description: 'A progressive Node.js framework for building efficient, scalable, and enterprise-grade server-side applications on top of TypeScript & JavaScript (ES6, ES7, ES8)',
      createdAt: '2017-10-22T10:17:21Z'
    },
    {
      owner: 'zeit',
      name: 'now',
      description: 'Realtime global deployments',
      createdAt: '2015-05-07T22:06:43Z'
    },
    {
      owner: 'webpack',
      name: 'webpack',
      description: 'A bundler for javascript and friends. Packs many modules into a few bundled assets. Code Splitting allows to load parts for the application on demand. Through "loaders," modules can be CommonJs, AMD, ES6 modules, CSS, Images, JSON, Coffeescript, LESS, ... and your custom stuff.',
      createdAt: '2012-03-10T23:14:08Z'
    },
    {
      owner: 'vuejs',
      name: 'vue',
      description: 'Vue.js is a progressive, incrementally-adoptable JavaScript framework for building UI on the web.',
      createdAt: '2013-07-29T03:19:22Z'
    },
    {
      owner: 'tensorflow',
      name: 'tensorflow',
      description: 'An Open Source Machine Learning Framework for Everyone',
      createdAt: '2015-11-07T01:19:12Z'
    },
    {
      owner: 'gatsbyjs',
      name: 'gatsby',
      description: 'Build blazing fast, modern apps and websites with React',
      createdAt: '2015-11-21T19:14:56Z'
    },
    {
      owner: 'grafana',
      name: 'grafana',
      description: 'The open and composable observability and data visualization platform. Visualize metrics, logs, and traces from multiple sources like Prometheus, Loki, Elasticsearch, InfluxDB, Postgres and many more.',
      createdAt: '2014-12-10T16:02:09Z'
    },
    {
      owner: 'lodash',
      name: 'lodash',
      description: 'A modern JavaScript utility library delivering modularity, performance, & extras.',
      createdAt: '2012-03-07T03:11:45Z'
    },
    {
      owner: 'facebook',
      name: 'react',
      description: 'A declarative, efficient, and flexible JavaScript library for building user interfaces.',
      createdAt: '2013-05-29T16:39:18Z',
    },
    {
      owner: 'tailwindlabs',
      name: 'tailwindcss',
      description: 'A utility-first CSS framework for rapidly building custom designs.',
      createdAt: '2017-10-20T15:31:54Z',
    },
    {
      owner: 'vercel',
      name: 'next.js',
      description: 'The React Framework for Production.',
      createdAt: '2016-11-16T02:47:22Z',
    },
  ];

  const [searchTerm, setSearchTerm] = useState<string>('');

  const filteredRepositories = repositories.filter(
    (repo) =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      repo.owner.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (session) {
    const { user } = session;
    if (!user) return <div>Loading...</div>;

    return (
      <>
        <nav className="bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex-shrink-0">
                <h1 className="text-white font-bold text-xl">SiteGithub</h1>
              </div>
              <div className="flex justify-center">
                <div className="ml-4 flex items-center">
                  <p className="text-white font-medium md:block hidden">{user.email}</p>
                  <button onClick={() => signOut()} className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 hover:bg-gray-700">
                    Sign out
                  </button>
                </div>
              </div>
            </div>
          </div>
        </nav>
    <div className="container mx-auto mt-7">
      <input
        className="border border-gray-400 p-2 rounded-md w-full"
        type="text"
        placeholder="Search repositories"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />
      <div className="mt-5">
        {filteredRepositories.map((repo) => (
          <RepositoryCard
            key={repo.name}
            owner={repo.owner}
            name={repo.name}
            description={repo.description}
            createdAt={repo.createdAt}
          />
        ))}
      </div>
    </div>
      </>
    );
  }

  return (
    <>
      <nav className="bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <h1 className="text-white font-bold text-xl">SiteGithub</h1>
            </div>
            <div >
              <div className="ml-4 flex items-center">
                <button onClick={() => signIn()} className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 hover:bg-gray-700">
                  Sign in
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
