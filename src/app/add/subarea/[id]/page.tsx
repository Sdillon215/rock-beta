import AddSubareaForm from '@/components/add_subarea_form/AddSubareaForm';


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
  
  return (
    <main>
        <AddSubareaForm id={id} />
    </main>
  );
}