import { Grid, Skeleton, Stack } from '@mui/material';
const DetailContentSkeleton = () => {
    return (
        <>
            <Grid item xs={12}>
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Skeleton variant="rounded" height={18} width="84%" />
                    <Skeleton variant="circular" height={26} width={26} />
                    <Skeleton variant="circular" height={26} width={26} />
                </Stack>
            </Grid>

            <Grid
                item
                xs={12}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 2
                }}
            >
                <Skeleton variant="circular" width={36} height={36} />
                <Stack width={'82%'} marginLeft={2}>
                    <Skeleton variant="rounded" width={'100%'} height={16} marginY={4} />
                    <Skeleton variant="rounded" width={'60%'} height={16} className="mt-2" />
                </Stack>
            </Grid>

            <Grid
                item
                xs={12}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 2
                }}
            >
                <Skeleton variant="circular" width={36} height={36} />
                <Stack width={'82%'} marginLeft={2}>
                    <Skeleton variant="rounded" width={'100%'} height={16} marginY={4} />
                    <Skeleton variant="rounded" width={'70%'} height={16} className="mt-2" />
                </Stack>
            </Grid>
            <Grid
                item
                xs={12}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 2
                }}
            >
                <Skeleton variant="circular" width={36} height={36} />
                <Stack width={'82%'} marginLeft={2}>
                    <Skeleton variant="rounded" width={'100%'} height={16} marginY={4} />
                    <Skeleton variant="rounded" width={'60%'} height={16} className="mt-2" />
                </Stack>
            </Grid>

            <Grid
                item
                xs={12}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 2
                }}
            >
                <Skeleton variant="circular" width={36} height={36} />
                <Stack width={'82%'} marginLeft={2}>
                    <Skeleton variant="rounded" width={'100%'} height={16} marginY={4} />
                    <Skeleton variant="rounded" width={'70%'} height={16} className="mt-2" />
                </Stack>
            </Grid>

            <Grid
                item
                xs={12}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 2
                }}
            >
                <Skeleton variant="circular" width={36} height={36} />
                <Stack width={'82%'} marginLeft={2}>
                    <Skeleton variant="rounded" width={'100%'} height={16} marginY={4} />
                    <Skeleton variant="rounded" width={'50%'} height={16} className="mt-2" />
                </Stack>
            </Grid>

            <Grid
                item
                xs={12}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    marginTop: 2
                }}
            >
                <Skeleton variant="circular" width={36} height={36} />
                <Stack width={'82%'} marginLeft={2}>
                    <Skeleton variant="rounded" width={'100%'} height={16} marginY={4} />
                    <Skeleton variant="rounded" width={'70%'} height={16} className="mt-2" />
                </Stack>
            </Grid>
        </>
    );
};

export default DetailContentSkeleton;
