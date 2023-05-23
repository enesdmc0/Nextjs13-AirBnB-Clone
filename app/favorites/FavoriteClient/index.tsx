import React from 'react';
import {SafeListing, SafeUser} from "@/types";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";

interface FavoriteClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null
}

const FavoriteClient: React.FC<FavoriteClientProps> = ({currentUser, listings}) => {
    return (
        <Container>
            <Heading title="Favorites" subtitle="List of places you favorited!" />
            <div className="grid mt-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 l:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
                {listings.map((listing: any) => (
                    <ListingCard
                        currentUser={currentUser}
                        key={listing.id}
                        data={listing}
                    />
                ))}
            </div>
        </Container>
    );
};

export default FavoriteClient;
