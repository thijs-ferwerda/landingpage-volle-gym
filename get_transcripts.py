import subprocess
import sys

def install(package):
    subprocess.check_call([sys.executable, "-m", "pip", "install", package])

try:
    from youtube_transcript_api import YouTubeTranscriptApi
except ImportError:
    install("youtube-transcript-api")
    from youtube_transcript_api import YouTubeTranscriptApi

video_ids = [
    '_ERwMRB4pgE', 'KxT9StIlyeg', 'xnhQBTBJPek', 'Qjc8I01bZE8', 
    'O_OFRYE3omQ', 'SpJ5KgQa9Ww', 'QIEOwUDPo5E', 'Lf0IVAiILrk', 
    'PcUTF1gOYNs', '38VjOUsOhz4', 'hAj5OnZTSo4', 'b4-jNpoxvwc', 
    'EsqOf51DvJ0', 'BbCw16hxhbo'
]

for vid in video_ids:
    try:
        # Try getting Dutch first
        ts = YouTubeTranscriptApi.get_transcript(vid, languages=['nl', 'en'])
        text = " ".join([x['text'] for x in ts])
        print(f"=== VIDEO: {vid} ===")
        print(text[:1500])
        print("\n")
    except Exception as e:
        print(f"=== VIDEO: {vid} ERROR: {e} ===")
