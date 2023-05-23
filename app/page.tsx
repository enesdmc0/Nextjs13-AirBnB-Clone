import Container from "../components/Container/index";
import ClientOnly from "../components/ClientOnly/index";
import EmptyState from "../components/EmptyState/index";
import ListingCard from "../components/listings/ListingCard/index";
import getListings, {IListingsParams} from "../actions/getListings/index";
import getCurrentUser from "../actions/getCurrentUser/index";

interface HomeProps {
    searchParams: IListingsParams
}

const Home = async ({ searchParams } : HomeProps) => {
    const listings = await getListings(searchParams)
    const currentUser = await getCurrentUser()

  if (listings.length === 0){
    return (
        <ClientOnly>
            <EmptyState showReset/>
        </ClientOnly>
    )
  }

  return (
      <ClientOnly>
        <Container>
          <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
              {listings.map((listing: any) => (
                  <ListingCard
                      key={listing.id}
                      data={listing}
                      currentUser={currentUser}
                  />
              ))}
          </div>
        </Container>
      </ClientOnly>
  )
}

export default Home;
export const dynamic = "force-dynamic";