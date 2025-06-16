import { ReduxProvider } from './reduxProvider';
import { I18nextProvider } from './i18nextProvider';

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <I18nextProvider>
      <ReduxProvider>{children}</ReduxProvider>
    </I18nextProvider>
  );
};
