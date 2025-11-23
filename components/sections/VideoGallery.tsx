import React from "react";

export function VideoGallery() {
    return (
        <section className="w-full py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">
                    Capital One Digital Disruption – Videos
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Video 1 */}
                    <div className="w-full aspect-video">
                        <iframe
                            className="w-full h-full rounded-xl"
                            src="https://www.youtube.com/embed/4k8lx0H9R6Y"
                            title="Capital One Digital Innovation"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>

                    {/* Video 2 */}
                    <div className="w-full aspect-video">
                        <iframe
                            className="w-full h-full rounded-xl"
                            src="https://www.youtube.com/embed/6lSx7s_EMKs"
                            title="How Capital One Uses Cloud"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                        ></iframe>
                    </div>

                </div>
            </div>
        </section>
    );
}