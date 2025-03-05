import AddRouteForm from '@/components/add_route_form/AddRouteForm';


export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;
  
  return (
    <main> 
        <AddRouteForm id={id} />
    </main>
  );
};