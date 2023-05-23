import React from 'react';
import getCurrentUser from "@/actions/getCurrentUser";
import ClientOnly from "@/components/ClientOnly";
import getFavoriteListings from "@/actions/getFavoriteListings";
import EmptyState from "@/components/EmptyState";
import FavoriteClient from "@/app/favorites/FavoriteClient";

const FavoritesPage = async () => {
    const currentUser = await getCurrentUser()
    const listings = await getFavoriteListings()

    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No favorites found"
                    subtitle="Looks like you have no favorite listings."
                />
            </ClientOnly>
        )
    }


    return (
        <ClientOnly>
            <FavoriteClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
};

export default FavoritesPage;
