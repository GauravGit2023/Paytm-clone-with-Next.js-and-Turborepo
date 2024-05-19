import { Card } from "@repo/ui/card";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";

export const RecentP2pTransfers = async( { transfers } : {
    transfers:{
        time: Date;
        amount: number;
        toUserId: number,
        fromUserId: number
    }[]
}) =>{

    const session = await getServerSession(authOptions);
    const userId = session.user.id;

    if(!transfers.length){
        return <Card title="Recent Transactions">
        <div className="text-center pb-8 pt-8">
            No Recent transactions
        </div>
    </Card>
    }

    return <Card title="Recent Transactions">
    <div className="pt-2">
        {transfers.map((t, index) => <div className="flex justify-between">
            <div key={index}>
                <div className="text-sm">
                    {t.toUserId === Number(userId) ? "Sent": "Received"} INR
                </div>
                <div className="text-slate-600 text-xs">
                    {t.time.toDateString()}
                </div>
            </div>
            <div className="flex flex-col justify-center">
                 Rs {t.amount / 100}
            </div>

        </div>)}
    </div>
</Card>
}