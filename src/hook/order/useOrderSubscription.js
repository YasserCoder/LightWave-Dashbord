import { useEffect } from "react";
import supabase from "../../services/supabase";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

const useOrderSubscription = () => {
    const queryClient = useQueryClient();

    useEffect(() => {
        // Subscribe to the 'orders' table
        const subscription = supabase
            .channel("orders-channel")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "order" },
                () => {
                    toast("New order received", {
                        icon: "🔔",
                    });
                    // Update the orders query in React Query
                    queryClient.invalidateQueries(`orders`);
                }
            )
            .subscribe();

        // Clean up the subscription on component unmount
        return () => {
            supabase.removeChannel(subscription);
        };
    }, [queryClient]);
};

export default useOrderSubscription;
