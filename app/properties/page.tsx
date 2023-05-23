import React from 'react';
import EmptyState from "@/components/EmptyState";
import ClientOnly from "@/components/ClientOnly";

import getCurrentUser from "@/actions/getCurrentUser";
import getListings from "@/actions/getListings";
import PropertiesClient from "@/app/properties/PropertiesClient";

const PropertiesPage = async () => {
    const currentUser = await getCurrentUser()
    if (!currentUser) {
        return <EmptyState
            title="Unauthorized"
            subtitle="Please login!"
        />
    }

    const listings = await getListings({userId: currentUser.id})
    if (listings.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="No properites found"
                    subtitle="Looks you have no properties."
                />
            </ClientOnly>
        )
    }

    return (
        <ClientOnly>
            <PropertiesClient
                listings={listings}
                currentUser={currentUser}
            />
        </ClientOnly>
    );
};

export default PropertiesPage;
