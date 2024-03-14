const API_BASE_URL = process.env.NEO_API_BASE_URL ?? "http://localhost";
const API_VERSION = process.env.NEO_API_VERSION ?? "v1";
const BASE_URL = `${API_BASE_URL}/${API_VERSION}`;
const DEFAULT_FEED_PARAMS = {
    start_date: "01-01-2020",
    end_date: "01-01-2023",
    size: 10
}

type GetFeedParams = Partial<typeof DEFAULT_FEED_PARAMS>;

interface Feed {
    id: string;

    name: string;

    date: string;

    diameter: string;

    distance: string;
}

interface Asteroid {
    id: string;

    name: string;

    is_potentially_hazardous_asteroid: boolean;

    estimated_diameter: EstimatedDiameter;

    close_approach_data: CloseApproachData[];
}

interface EstimatedDiameter {
    kilometers: EstimatedDiameterMinMax;

    meters: EstimatedDiameterMinMax;

    miles: EstimatedDiameterMinMax;

    feet: EstimatedDiameterMinMax;
}

interface CloseApproachData {
    miss_distance: MissDistance;
}

interface MissDistance {
    astronomical: string;

    lunar: string;

    kilometers: string;

    miles: string;
}

interface EstimatedDiameterMinMax {
    estimated_diameter_min: number;

    estimated_diameter_max: number;
}

export default class NeoClient {
    async getFeeds(params: GetFeedParams = {}): Promise<{
        feeds: Feed[]
    }> {
        const queryParams = this.queryString({
            ...DEFAULT_FEED_PARAMS,
            ...params,
        });
        const url = `${BASE_URL}/feed${queryParams}`;
        const response = await fetch(url);
        const feeds = await response.json();

        return { feeds };
    }

    async getAsteroidById(id: string): Promise<{
        asteroid: Asteroid
    }> {
        const url = `${BASE_URL}/lookup/${id}`;
        const response = await fetch(url);
        const asteroid = await response.json();

        return { asteroid };
    }

    private queryString(params: Record<string, string | string[] | number>) {
        const queryParams = Object.keys(params)
            .map((key) => `${key}=${encodeURIComponent(params[key].toString())}`)
            .join("&");

        return queryParams ? `?${queryParams}` : "";
    }
}