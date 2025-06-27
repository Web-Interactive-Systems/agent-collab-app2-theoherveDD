import { useState, useEffect } from "react";
import { Box, Button, Card, Flex, Progress, Text, Select } from "@radix-ui/themes";
import { PlayIcon, PauseIcon } from "@radix-ui/react-icons";

function Player({ currentSong, sdk }) {
    const [devices, setDevices] = useState([]);
    const [deviceId, setDeviceId] = useState("");
    const [selectedDevice, setSelectedDevice] = useState("");
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(50);

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const { devices } = await sdk.player.getAvailableDevices();
                setDevices(devices);
                if (devices.length > 0) {
                    const defaultDevice = devices.find((d) => !d.is_restricted) || devices[0];
                    setSelectedDevice(defaultDevice.id);
                    setDeviceId(defaultDevice.id);
                }
            } catch (error) {
                console.error("Error fetching devices:", error);
                alert("Erreur lors du chargement des appareils.");
            }
        };

        fetchDevices();
    }, []);

    useEffect(() => {
        setDeviceId(selectedDevice);
        if (selectedDevice) {
            sdk.player.setPlaybackVolume(volume, selectedDevice).catch(console.error);
        }
    }, [selectedDevice]);

    useEffect(() => {
        if (currentSong && deviceId) {
            playTrack();
        }
    }, [currentSong]);

    const playTrack = async () => {
        if (!currentSong || !deviceId) return;
        const trackUri = `spotify:track:${currentSong.id}`;

        try {
            await sdk.player.startResumePlayback(deviceId, undefined, [trackUri]);
        } catch (error) {
            console.error("Playback error:", error);
        } finally {
            setIsPlaying(true);
        }
    };

    const pauseTrack = async () => {
        try {
            await sdk.player.pausePlayback(deviceId);

        } catch (error) {
            console.error("Failed to pause:", error);
        }
        finally {
            setIsPlaying(false);
        }
    };


    const handleVolumeChange = async (e) => {
        const newVolume = parseInt(e.target.value, 10);
        setVolume(newVolume);
        try {
            await sdk.player.setPlaybackVolume(newVolume, deviceId);
        } catch (error) {
            console.error("Volume error:", error);
        }
    };



    return (
        <Card width="100%" p="4">
            <Flex direction="column" gap="4">
                <Text weight="bold" size="3">
                    {currentSong ? `${currentSong.title} — ${currentSong.artist}` : "Aucune chanson sélectionnée"}
                </Text>

                <Flex gap="3" align="center" justify="between" wrap="wrap">
                    <Select.Root
                        value={selectedDevice || undefined}
                        onValueChange={(val) => setSelectedDevice(val)}
                    >
                        <Select.Trigger placeholder="Choisir un appareil" variant="soft" />
                        <Select.Content>
                            {devices.map((device) => (
                                <Select.Item
                                    key={device.id}
                                    value={device.id}
                                    disabled={device.is_restricted}
                                >
                                    {device.name} {device.is_restricted && "(incompatible)"}
                                </Select.Item>
                            ))}
                        </Select.Content>
                    </Select.Root>

                    {/* Controls */}
                    <Flex gap="2">


                        {isPlaying ? (
                            <Button onClick={pauseTrack}><PauseIcon /></Button>
                        ) : (
                            <Button onClick={playTrack}><PlayIcon /></Button>
                        )}


                    </Flex>

                    {/* Volume */}
                    <Flex align="center" gap="2">
                        <Text size="1">Volume</Text>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={volume}
                            onChange={handleVolumeChange}
                        />
                    </Flex>
                </Flex>
            </Flex>
        </Card>
    );
}

export default Player;