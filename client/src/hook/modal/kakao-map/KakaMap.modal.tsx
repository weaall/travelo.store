import { useEffect, useState } from "react";
import * as tw from "./KakaMap.modal.styles";

import markerSvg from "../../../assets/svg/marker_icon.svg";
import rightSvg from "../../../assets/svg/right_icon.svg";
import S3UrlToCFUrl from "../../../utils/s3UrlToCFD.utils";

interface ModalProps {
    onClose: () => void;
    hotelName: string;
    address: string;
    imgUrl: string;
}

declare global {
    interface Window {
        kakao: any;
    }
}

export default function KakaoMapModal({ onClose, hotelName, address, imgUrl }: ModalProps) {
    const [isClosing, setIsClosing] = useState(false);

    const handleCloseClick = () => {
        triggerCloseAnimation();
    };

    const triggerCloseAnimation = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 500);
    };

    useEffect(() => {
        // 카카오 맵 스크립트 로드
        const script = document.createElement("script");
        script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=187da0e874b0c4dc28f8ce1707a006af&autoload=false&libraries=services`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            window.kakao.maps.load(() => {
                const mapContainer = document.getElementById("map");
                const mapOption = {
                    center: new window.kakao.maps.LatLng(33.450701, 126.570667),
                    level: 6,
                };

                const map = new window.kakao.maps.Map(mapContainer, mapOption);
                const geocoder = new window.kakao.maps.services.Geocoder();

                const hotelUrl = S3UrlToCFUrl(imgUrl)

                geocoder.addressSearch(address, (result: { x: number; y: number }[], status: any) => {
                    if (status === window.kakao.maps.services.Status.OK) {
                        const coords = new window.kakao.maps.LatLng(result[0].y, result[0].x);
                        const markerImage = new window.kakao.maps.MarkerImage(markerSvg, new window.kakao.maps.Size(50, 50), { offset: new window.kakao.maps.Point(25, 50) });
                        const marker = new window.kakao.maps.Marker({
                            position: coords,
                            image: markerImage,
                        });

                        marker.setMap(map);

                        const content = `
                            <div class="flex bg-white">
                                <div class="h-12 w-12">
                                    <img class="h-full w-full object-cover rounded-l-lg" src="${hotelUrl}">
                                </div>
                                <div class="my-auto px-3">
                                    <p class="font-medium text-base">${hotelName}</p>
                                </div>
                                <div class="w-8 px-1 h-12 content-center bg-black rounded-r-lg">
                                    <img class="object-cover" src="${rightSvg}">
                                </div>
                            </div>
                        `;

                        new window.kakao.maps.CustomOverlay({
                            map: map,
                            position: coords,
                            content: content,
                            yAnchor: 2.2,
                        });

                        map.setCenter(coords);
                    }
                });
            });
        };

        return () => {
            document.head.removeChild(script);
        };
    }, [address, hotelName, imgUrl]);

    return (
        <tw.Container $isClosing={isClosing}>
            <tw.ModalWrap $isClosing={isClosing}>
                <tw.TitleWrap>
                    <tw.CloseBtn onClick={handleCloseClick}>
                        <tw.CloseSVG alt="닫기 버튼" src={require("../../../assets/svg/close_svg.svg").default} />
                    </tw.CloseBtn>
                    <tw.Title>주소</tw.Title>
                </tw.TitleWrap>
                <div id="map" style={{ width: "100%", height: "100%" }} />
            </tw.ModalWrap>
        </tw.Container>
    );
}
