import AddCragForm from '@/components/add_crag_form/AddCragForm';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
  
  return (
    <main> 
        <AddCragForm id={id} />
    </main>
  );
};