import { fetchInvoice } from '@/lib/data';
import { notFound } from 'next/navigation';
import InvoiceDetails from './_components/invoice-details';
import ArrowLeft from './_components/arrow-left';
import Link from 'next/link';
import { InvoiceDetail } from '@/lib/definitions';
import InvoiceDetailButtons from '@/components/ui/invoice-detail-buttons';

export default async function Page({ params }: { params?: { id?: string } }) {
  const { id } = params ?? {};

  if (!id) return notFound();

  const invoice: InvoiceDetail = await fetchInvoice({ id });

  if (!invoice) return notFound();

  return (
    <>
      <main className="mx-6 mb-[150px] mt-[33px] lg:mx-auto lg:mb-0 lg:mt-[65px] lg:w-[730px]">
        <Link className="flex items-center gap-6 font-bold" href="/invoices">
          <ArrowLeft />
          <p className="body-variant h-[12px] text-[15px] font-bold">Go back</p>
        </Link>
        <InvoiceDetails invoice={invoice} />
      </main>
      <footer className="fixed bottom-0 flex w-full items-center justify-center gap-2 bg-white px-6 py-5 dark:bg-third md:hidden">
        <InvoiceDetailButtons invoice={invoice} />
      </footer>
    </>
  );
}
