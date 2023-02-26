import { useRouter } from 'next/router';
import RepositoryDetails from '../../components/RepositoryDetails';

export default function RepositoryPage() {
  const router = useRouter();
  const { owner, name } = router.query;

  if (!owner || !name) {
    return <p>Please specify the owner and name of the repository.</p>;
  }

  return <RepositoryDetails owner={owner as string} name={name as string} />;
}
