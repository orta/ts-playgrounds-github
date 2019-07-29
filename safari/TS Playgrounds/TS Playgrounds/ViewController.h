#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>

NS_ASSUME_NONNULL_BEGIN

@interface ViewController : NSViewController
@property (weak) IBOutlet WKWebView *webView;

@end

NS_ASSUME_NONNULL_END
