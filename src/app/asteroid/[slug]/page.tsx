import { use } from "react";
import { notFound } from "next/navigation";

import neoService from "@/lib/neo/neo-service";

interface AsteroidPageParams {
    params: {
        slug: string;
    }
}

function AsteroidPage({ params }: AsteroidPageParams) {
    const { asteroid } = use(neoService.getAsteroidById(params.slug));

    if (!asteroid) {
        notFound();
    }

    return (
        <div className={"my-8 container mx-auto"}>
            <div className={"flex flex-col space-y-4"}>
                <div className={"flex flex-col space-y-2"}>
                    <h1 className={"text-3xl font-semibold"}>{asteroid.name}</h1>
                    <h2 className={"text-xl font-semibold"}>Estimated diameter</h2>
                    <h3 className={"text-l font-medium"}>{asteroid.estimated_diameter.kilometers.estimated_diameter_min} - {asteroid.estimated_diameter.kilometers.estimated_diameter_max} Km</h3>
                    <h2 className={"text-xl font-semibold"}>Estimated distance from Earth</h2>
                    <h3 className={"text-l font-medium"}>{asteroid.close_approach_data[0].miss_distance.kilometers} Km</h3>
                </div>
            </div>
        </div>
    )
}

export default AsteroidPage;