import { AuctionProgressProps } from '@/types/AuctionProgress.type';
import { List, ListSubheader } from '@mui/material';

const AuctionProgress = ({ data }: AuctionProgressProps) => {
    return (
        <div className=" w-9/12 basis-1/2 border-2  rounded-md border-gray-200 text-center p-3 my-2">
            <h1 className="text-xl font-bold">Diễn biến cuộc đấu giá</h1>
            <List
                className=" border-2  rounded-md border-gray-200"
                sx={{
                    width: '100%',
                    maxWidth: 360,
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 200,
                    '& ul': { padding: 0 },
                }}
                subheader={<li />}
            >
                {data.map((sectionId) => (
                    <li key={`section-${sectionId}`}>
                        <ul>
                            <ListSubheader className="flex flex-row h-16 justify-between items-center text-center  border-2 rounded-sm border-current">
                                <div className="basis-1/2">
                                    <p className="text-xs font-semibold text-black">{sectionId.bid}</p>
                                    <p className="text-xs font-semibold">{sectionId.time}</p>
                                </div>
                                <div className="basis-1/2 flex-col justify-center items-center">
                                    <p className="text-xs font-semibold text-black">{sectionId.name}</p>
                                    {sectionId.isOwn && <p className="text-xs font-semibold">Trả giá của bạn</p>}
                                </div>
                            </ListSubheader>
                        </ul>
                    </li>
                ))}
            </List>
        </div>
    );
};

export default AuctionProgress;
