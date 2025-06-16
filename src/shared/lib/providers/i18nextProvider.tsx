import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { FC } from 'react';

interface I18n {
  children: React.ReactNode;
}

export const I18nextProvider: FC<I18n> = async props => {
  const { children } = props;

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
};
