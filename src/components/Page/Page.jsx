import { Helmet } from 'react-helmet-async';
import { forwardRef } from 'react';

const Page = forwardRef(({ children, title = '', meta, ...other }, ref) => (
  <>
    <Helmet>
      <title>{`${title} | Movies Web`}</title>
      {meta}
    </Helmet>

    <main ref={ref} {...other}>
      {children}
    </main>
  </>
));

export default Page;
