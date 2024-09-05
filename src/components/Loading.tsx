export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 h-[750px]">
      <div className="relative h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      <div className="space-y-1 text-center">
        <h3 className="text-lg font-medium">Loading...</h3>
        <p className="text-muted-foreground">
          Please wait while we fetch the data
        </p>
      </div>
    </div>
  );
}
