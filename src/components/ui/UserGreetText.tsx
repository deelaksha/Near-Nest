"use client";
import { createClient } from "../../..//utils/supabase/client";
import React, { useEffect, useState } from "react";

const UserGreetText = () => {
  const [user, setUser] = useState<any>(null);
  const supabase = createClient();

  useEffect(() => {
    const fetchUser = async () => {
      // Get authenticated user
      const { data: authData, error: authError } = await supabase.auth.getUser();
      if (authError || !authData.user) {
        console.error("Error fetching user:", authError);
        return;
      }

      const userId = authData.user.id;

      // Fetch user profile from 'profiles' table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("full_name")
        .eq("id", userId)
        .single();

      if (profileError) {
        console.error("Error fetching profile:", profileError);
      }

      setUser({ ...authData.user, full_name: profile?.full_name || "user" });
    };

    fetchUser();
  }, []);

  return (
    <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
      Hello&nbsp;
      <code className="font-mono font-bold">{user?.full_name ?? "user"}!</code>
    </p>
  );
};

export default UserGreetText;
