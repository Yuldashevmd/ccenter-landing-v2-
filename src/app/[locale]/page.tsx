import { useLng } from 'shared/lib';
import { Button } from 'shared/ui';

export default function Home() {
  const { t } = useLng();

  return (
    <div>
      <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer">
        {t('welcome')}
      </Button>
    </div>
  );
}
